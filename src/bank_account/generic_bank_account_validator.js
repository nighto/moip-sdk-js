(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function GenericBankAccountValidator() {
    if ( !( this instanceof GenericBankAccountValidator ) ) {
      return new GenericBankAccountValidator();
    }
  }

  GenericBankAccountValidator.prototype = {
    bankNumberIsValid : function (bankNumber) {
      return /^([0-9-A-Za-x]{3,5})$/.test(bankNumber);
    },

    agencyNumberIsValid: function(agencyNumber) {
      return /^[0-9]{1,5}$/.test(agencyNumber) && parseInt(agencyNumber) > 0;
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return /^[a-zA-Z0-9]{0,2}$/.test(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return /^[a-zA-Z0-9]{0,2}$/.test(accountCheckNumber);
    },

    checkNumberMatch: function(bankAccount) {
      return true;
    }
  };

  Moip.GenericBankAccountValidator = GenericBankAccountValidator();

})(window);