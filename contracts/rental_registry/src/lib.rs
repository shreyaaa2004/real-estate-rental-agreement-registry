#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    PropertyCount,
    Property(u32),
    Agreement(u32),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Property {
    pub owner: Address,
    pub title: String,
    pub rent_amount: i128,
    pub is_available: bool,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Agreement {
    pub tenant: Address,
    pub duration_months: u32,
    pub active: bool,
    pub last_payment_timestamp: u64,
}

#[contract]
pub struct RentalRegistry;

#[contractimpl]
impl RentalRegistry {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::PropertyCount, &0u32);
    }

    pub fn list_property(env: Env, owner: Address, title: String, rent_amount: i128) -> u32 {
        owner.require_auth();
        
        let mut count: u32 = env.storage().instance().get(&DataKey::PropertyCount).unwrap_or(0);
        count += 1;
        
        let property = Property {
            owner: owner.clone(),
            title,
            rent_amount,
            is_available: true,
        };
        
        env.storage().persistent().set(&DataKey::Property(count), &property);
        env.storage().instance().set(&DataKey::PropertyCount, &count);
        
        // Publish event
        env.events().publish((symbol_short!("listed"), count), owner);
        
        count
    }

    pub fn create_agreement(env: Env, property_id: u32, tenant: Address, duration_months: u32) {
        tenant.require_auth();
        
        let property: Property = env.storage().persistent().get(&DataKey::Property(property_id)).expect("Property not found");
        if !property.is_available {
            panic!("Property is not available");
        }
        
        let agreement = Agreement {
            tenant: tenant.clone(),
            duration_months,
            active: false, // Requires owner signature to become active
            last_payment_timestamp: 0,
        };
        
        env.storage().persistent().set(&DataKey::Agreement(property_id), &agreement);
        
        // Publish event
        env.events().publish((symbol_short!("req_agree"), property_id), tenant);
    }

    pub fn sign_agreement(env: Env, property_id: u32, owner: Address) {
        owner.require_auth();
        
        let mut property: Property = env.storage().persistent().get(&DataKey::Property(property_id)).expect("Property not found");
        if property.owner != owner {
            panic!("Only owner can sign");
        }
        
        let mut agreement: Agreement = env.storage().persistent().get(&DataKey::Agreement(property_id)).expect("Agreement not found");
        if agreement.active {
            panic!("Already active");
        }
        
        property.is_available = false;
        agreement.active = true;
        agreement.last_payment_timestamp = env.ledger().timestamp();
        
        env.storage().persistent().set(&DataKey::Property(property_id), &property);
        env.storage().persistent().set(&DataKey::Agreement(property_id), &agreement);
        
        // Publish event
        env.events().publish((symbol_short!("signed"), property_id), owner);
    }

    pub fn pay_rent(env: Env, property_id: u32, tenant: Address) {
        tenant.require_auth();
        
        let mut agreement: Agreement = env.storage().persistent().get(&DataKey::Agreement(property_id)).expect("Agreement not found");
        if agreement.tenant != tenant {
            panic!("Only tenant can pay rent");
        }
        if !agreement.active {
            panic!("Agreement not active");
        }
        
        // In a real application, this would transfer tokens from tenant to owner using the token interface.
        // For this registry, we just log the payment event.
        agreement.last_payment_timestamp = env.ledger().timestamp();
        env.storage().persistent().set(&DataKey::Agreement(property_id), &agreement);
        
        // Publish event
        env.events().publish((symbol_short!("rent_paid"), property_id), tenant);
    }
    
    pub fn get_property(env: Env, property_id: u32) -> Property {
        env.storage().persistent().get(&DataKey::Property(property_id)).expect("Property not found")
    }
    
    pub fn get_agreement(env: Env, property_id: u32) -> Agreement {
        env.storage().persistent().get(&DataKey::Agreement(property_id)).expect("Agreement not found")
    }
    
    pub fn get_property_count(env: Env) -> u32 {
        env.storage().instance().get(&DataKey::PropertyCount).unwrap_or(0)
    }
}
