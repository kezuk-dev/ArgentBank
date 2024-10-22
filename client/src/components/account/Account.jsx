import "./account.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Account({ name, solde, balance }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{name}</h3>
        <p className="account-amount">${solde}</p>
        <p className="account-amount-description">{balance}</p>
      </div>
      <div className="account-content-wrapper cta">
      <FontAwesomeIcon className="white" icon={faChevronRight}/>
      </div>
    </section>
  );
}

export default Account;
