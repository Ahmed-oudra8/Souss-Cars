const questions = [
  {
    question: "Comment réserver une voiture chez SOUSS CARS ?",
    answer:
      "Vous pouvez consulter les voitures disponibles et contacter notre agence pour organiser votre réservation."
  },
  {
    question: "Où puis-je récupérer ma voiture ?",
    answer:
      "Le lieu de récupération peut être convenu avec notre agence, selon les conditions de réservation."
  },
  {
    question: "Quels documents sont nécessaires pour louer une voiture ?",
    answer:
      "Les documents nécessaires seront précisés par notre agence selon les conditions de location."
  },
  {
    question: "Puis-je louer une voiture pour plusieurs jours ?",
    answer:
      "Oui, vous pouvez demander une location pour plusieurs jours selon la disponibilité des véhicules."
  },
  {
    question: "Comment contacter SOUSS CARS ?",
    answer:
      "Vous pouvez utiliser notre page Contact pour envoyer une demande à notre agence."
  }
];

function FAQ() {
  return (
    <section className="faq-section">

      <div className="section-heading">
        <span>FAQ</span>

        <h2>Questions fréquentes</h2>

        <p>
          Retrouvez les réponses aux questions les plus fréquentes
          concernant la location de voitures.
        </p>
      </div>

      <div className="faq-container">

        {questions.map((item, index) => (
          <details className="faq-item" key={index}>

            <summary>{item.question}</summary>

            <p>{item.answer}</p>

          </details>
        ))}

      </div>

    </section>
  );
}

export default FAQ;