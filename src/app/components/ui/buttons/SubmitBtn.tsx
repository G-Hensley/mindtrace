import { SubmitButton } from '../../../lib/oop';

export default function SubmitBtn() {
  // Using the OOP class to demonstrate inheritance and polymorphism
  const submitButton = new SubmitButton();

  return (
    <button
      className={submitButton.getClassName()}
      type={submitButton.type}
      aria-label={submitButton.getAriaLabel()}
      disabled={submitButton.isDisabled()}>
      {submitButton.text}
    </button>
  );
}
