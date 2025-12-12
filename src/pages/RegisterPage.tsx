import { RegistrationWizard } from '@/features/Registration';

export function RegisterPage() {
  return (
    <div className="page page--register">
      <header className="page-header">
        <h1>Register Story</h1>
        <p>Follow the steps below to register your story on-chain with transparent attribution.</p>
      </header>

      <RegistrationWizard />
    </div>
  );
}
