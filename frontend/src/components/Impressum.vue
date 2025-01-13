<script>

</script>

<template>
    <div class="impressum">
      <h1>Impressum</h1>

      <section>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p><strong>Name/Firma:</strong> FlexiFit GmbH </p>
        <p><strong>Vertretungsberechtigt:</strong> Julia Martin, Majella Kühne</p>
        <p><strong>Adresse:</strong> Rheingutstraße 41 78462 Konstanz</p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p><strong>Telefon:</strong> </p>
        <p><strong>E-Mail:</strong> info@flexifit.de </p>
        <p><strong>Ansprechpartner:</strong> Majella Kühne </p>
      </section>

      <section v-if="isCompany">
        <h2>Handelsregister</h2>
        <p><strong>Registergericht:</strong> {{ registerCourt }}</p>
        <p><strong>Registernummer:</strong> {{ registerNumber }}</p>
      </section>

      <section>
        <h2>Steuernummer</h2>
        <p>DE123456789</p>
      </section>


      <section v-if="isProfessional">
        <h2>Angaben zur Berufsreglementierung</h2>
        <p><strong>Berufsbezeichnung:</strong> {{ profession }}</p>
        <p><strong>Verliehen durch:</strong> {{ professionCountry }}</p>
        <p><strong>Zuständige Kammer:</strong> {{ chamber }}</p>
        <p><strong>Berufsrechtliche Regelungen:</strong> {{ professionRules }}</p>
      </section>

      <section>
        <h2>Online-Streitbeilegung</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:https://ec.europa.eu/consumers/odr
        </p>
        <p>Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <p>Haftung für Inhalte</p>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
      </section>
    </div>

  </template>



<style scoped>
.impressum {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  line-height: 1.8;
  color: #444;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #7030a0;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8rem;
  color: #7030a0;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

p {
  margin: 10px 0;
  font-size: 1rem;
  color: #555;
}

strong {
  font-weight: bold;
  color: #333;
}

a {
  color: #7030a0;
  text-decoration: underline;
  transition: color 0.3s ease;
}

a:hover {
  color: #4e216c;
}

section {
  margin-bottom: 20px;
}

.impressum > section:last-child {
  margin-bottom: 0;
}

/* Zusätzliche Verbesserungen */
.impressum p {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

h2::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background-color: #7030a0;
  margin-top: 5px;
  border-radius: 2px;
}

</style>



