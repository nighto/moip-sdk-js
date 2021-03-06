(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BankAccount() {
    if ( !( this instanceof BankAccount ) ) {
      return new BankAccount();
    }
  }

  BankAccount.prototype = {

    validate : function (params){

      var errors = [];
      var validator;
      var validators = {
        "001": Moip.BancoDoBrasilValidator,
        "237": Moip.BradescoValidator,
        "341": Moip.ItauValidator,
        "033": Moip.SantanderValidator,
        "041": Moip.BanrisulValidator,
        "075": Moip.CitibankValidator,
        "399": Moip.HSBCValidator
      };

      if (validators[params.bankNumber]) {
        validator = validators[params.bankNumber];
      } else {
        validator = Moip.GenericBankAccountValidator;
      }

      if(!Moip.GenericBankAccountValidator.bankNumberIsValid(params.bankNumber)){
        errors.push({ description: "Banco inválido", code: "INVALID_BANK_NUMBER" });
      }

      if(!validator.agencyNumberIsValid(params.agencyNumber)){
        errors.push({ description: "Agência inválida", code: "INVALID_AGENCY_NUMBER" });
      }
      
      if(!validator.agencyCheckNumberIsValid(params.agencyCheckNumber)){
        errors.push({ description: "Dígito da agência inválido", code: "INVALID_AGENCY_CHECK_NUMBER" });
      }

      if(!validator.accountNumberIsValid(params.accountNumber)){
        errors.push({ description: "Conta corrente inválida", code: "INVALID_ACCOUNT_NUMBER" });
      }
      
      if(!validator.accountCheckNumberIsValid(params.accountCheckNumber)){
        errors.push({ description: "Dígito da conta corrente inválido", code: "INVALID_ACCOUNT_CHECK_NUMBER" });
      }

      if(errors.length === 0) {
        params.valid();
      } else {
        params.invalid({ errors: errors });
      }
    }
  
  };

  Moip.BankAccount = BankAccount();

})(window);
