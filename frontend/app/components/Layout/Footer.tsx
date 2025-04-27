import './footer.css';
import testIds from '@app/utils/test-ids';

const Footer = () => (
  <footer
    className="w-full m-h-56 bg-turquoise-100 leading-7"
    data-testid={testIds.LAYOUT.FOOTER}
  >
    <div className="bg-black text-white text-center py-6">
      <h2 className="text-2xl sm:text-4xl font-bold">
        POUR TOUTE RÉSERVATION
      </h2>
      <p className="mt-10 text-xs sm:text-base">
        SHOP@TICKET.COM | TÉL : 07 60 47 56 43
      </p>
    </div>
    <div className="mx-auto flex flex-col-reverse items-center sm:flex-row gap-1 sm:gap-16 pt-3 sm:pt-11 pb-4 sm:pb-20 px-6 sm:px-14 text-12 sm:text-xs">
      <p className="font-default mb-10 flex-1">
        © 2025 EV$NT.
      </p>
      <a href="/conditions">CONDITIONS GÉNÉRALES</a>
      <a href="/livraison">LIVRAISON & RETOURS</a>
      <a href="/faq">FOIRE AUX QUESTIONS</a>
    </div>
  </footer>
);

export default Footer;