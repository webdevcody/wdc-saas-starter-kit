export function NewsletterSection() {
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          "use server";
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
