class Fetch {
  constructor(url_basis) {
    this.url_basis = url_basis;
    this.token = "";
    this.login = "cheikinfall";
    this.pwd = "cheikinfall";
  }
  getToken(success, failure) {
    fetch(this.url_basis + "rest/session/token/")
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Erreur (même si le server a répondu)- statut : " + response.status
          );
          failure(response.status);
          return;
        }
        response.text.then(function(data) {
          //ca roule, le serveur a répondu et il a bien
          //renvoyer une chaine de carractere qui coo
          console.log("dans getToken - token: ", data);
          success(data);
        });
      })
      .catch(error => {
        console.log("Erreur 'catchée' sur la promesse  ", error);
        failure(error);
      });
  }
  getTerms = (success, failure) => {
    try {
      fetch(this.url_basis + "memo/themes/", {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/hal+json",
          "X-CSRF-Token": this.token,
          Authorization: "Basic " + btoa(this.login + ":" + this.pwd) // btoa = encodage en base 64
        }
      }).then(function(response) {
        if (response.status !== 200) {
          // Il y a un problème, le statut de la réponse n'est pas le bon
          console.error("Erreur - statut : " + response.status);
          failure(response.status);
        } else {
          // Ca roule... mais encore faut-il que la
          // réponse soit dans le bon format
          response.json().then(function(data) {
            console.log("terms : ", data);
            // On appelle le callback
            success(data);
          });
        }
      });
    } catch (error) {
      console.error("Erreur : " + error);
    }
  };
}

export default Fetch;
