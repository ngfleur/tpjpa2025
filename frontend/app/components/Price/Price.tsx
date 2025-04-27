// app/components/Price/Price.tsx
export default function Price({ amount }: { amount: number }) {
  return (
    <span>
      {new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)}
    </span>
  );
}