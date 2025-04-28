// app/api/register/page.js
import ErrorBoundary from "@/components/ErrorBoundary";
import RegisterDonorForm from "@/components/RegisterDonorForm"; // make sure path is correct

export default function RegisterPage() {
  return (
    <ErrorBoundary>
      <RegisterDonorForm />
    </ErrorBoundary>
  );
}
