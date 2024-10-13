CREATE INDEX IF NOT EXISTS "user_id_account_type_idx" ON "gf_accounts" ("userId","accountType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "following_user_id_foreign_user_id_idx" ON "gf_following" ("userId","foreignUserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "groups_user_id_is_public_idx" ON "gf_group" ("userId","isPublic");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "magic_links_token_idx" ON "gf_magic_links" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "memberships_user_id_group_id_idx" ON "gf_membership" ("userId","groupId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "replies_post_id_idx" ON "gf_replies" ("postId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reset_tokens_token_idx" ON "gf_reset_tokens" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "gf_session" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_stripe_subscription_id_idx" ON "gf_subscriptions" ("stripeSubscriptionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verify_email_tokens_token_idx" ON "gf_verify_email_tokens" ("token");--> statement-breakpoint
ALTER TABLE "gf_subscriptions" ADD CONSTRAINT "gf_subscriptions_userId_unique" UNIQUE("userId");