-- Minimal DDL mirroring the tables the webhook writes to (with this change applied).
CREATE TABLE gf_subscriptions(id serial PRIMARY KEY,stripe_subscription_id text NOT NULL,expires timestamp NOT NULL);
