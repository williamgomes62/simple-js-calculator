function Calculator() {
  this.display = document.querySelector('.display');

  this.clearDisplay = () => this.display.value = '';

  this.deleteOne = () => {
    this.display.value = this.display.value.slice(0, -1);
  };

  this.processResult = () => {
    let count = this.display.value;

    try {
      // eval avalia e resolve como uma expressão js
      // Cuidado, pode ser usado para fins maliciosos
      // Já que executa qualquer comando js passado
      count = eval(count);

      if (typeof count === 'undefined') {
        alert('Conta inválida!');
        return;
      }

      this.display.value = String(count);
    } catch (err) {
      alert('Conta inválida!');
      return;
    }
  };

  this.start = () => {
    this.btnClicks();
    this.pressEnter();
  };

  this.pressEnter = () => {
    this.display.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.processResult();
      }
    });
  };

  // Observar o comportamento do this
  // .bind(this) resolve, faz com que o this referenciado
  // seja o do objeto novamente
  // ARROW FUNCTION NÃO MUDA O THIS
  this.btnClicks = () => {
    // this -> calculadora
    document.addEventListener('click', (event) => {
      // this -> document
      const el = event.target;

      if (el.classList.contains('btn-num')) {
        this.btnToDisplay(el.innerText);
      }

      if (el.classList.contains('btn-clear')) {
        this.clearDisplay();
      }

      if (el.classList.contains('btn-del')) {
        this.deleteOne();
      }

      if (el.classList.contains('btn-eq')) {
        this.processResult();
      }
    });
  };

  this.btnToDisplay = (value) => this.display.value += value;
}

const calculator = new Calculator();
calculator.start();