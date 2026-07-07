import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
