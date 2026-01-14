/**
 * Subscription and Pricing Types
 */

export interface PricePlan {
    id: number;
    title?: string;
    subtitle?: string;
    price: number;
    formatted_price: string;
    type_label: string;
    currency?: string;
    billing_cycle?: 'monthly' | 'yearly' | 'lifetime';
    features?: PlanFeature[]; // Changed to optional as it's plan_features in API, but let's see if we need to map it
    plan_features?: any[]; // specific to API structure
    is_popular?: boolean;
    has_trial?: boolean;
    trial_days?: number;
}

export interface PlanFeature {
    id: number;
    title: string;
    included: boolean;
}

export interface ThemeOption {
    id: string;
    name: string;
    preview_url?: string;
    description?: string;
}

// Subscription Initiation
export interface InitiateSubscriptionRequest {
    plan_id: number;
    subdomain: string;
    theme?: string;
    payment_gateway: 'stripe' | 'paypal' | 'manual';
    is_trial?: boolean;
    coupon_code?: string;
}

export interface PaymentLog {
    id: number;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    payment_gateway: string;
    created_at: string;
}

export interface InitiateSubscriptionResponse {
    success: boolean;
    message?: string;
    data: {
        payment_log: PaymentLog;
        checkout_url?: string; // For redirect-based payments (Stripe, PayPal)
    };
}

// Subscription Completion
export interface CompleteSubscriptionRequest {
    payment_log_id: number;
    transaction_id: string;
    payment_gateway: string;
}

export interface Subscription {
    id: number;
    plan_id: number;
    status: 'active' | 'trial' | 'expired' | 'cancelled' | 'pending';
    starts_at: string;
    ends_at: string;
    created_at: string;
}

export interface CompleteSubscriptionResponse {
    success: boolean;
    message?: string;
    data: {
        tenant_url: string;
        tenant: import('./tenant').Tenant;
        subscription: Subscription;
    };
}

// Plans list response
export interface PlansListResponse {
    success: boolean;
    data: PricePlan[];
}

// Themes list response
export interface ThemesListResponse {
    success: boolean;
    data: ThemeOption[];
}
