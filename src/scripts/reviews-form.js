const validateName = name => {
  if (!name.length) {
    return { valid: false, error: "Это поле обязательное", showError: true };
  }
  return { valid: true, error: null, showError: false };
};

const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: "Это поле обязательное", showError: true };
  }
  if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    return { valid: false, error: "Пожалуйста, введите коректную пошту", showError: true };
  }
  return { valid: true, error: null, showError: false };
};

const validateDesc = desc => {
  if (!desc.length) {
    return { valid: false, error: "Это поле обязательное", showError: true };
  }
  if (desc.length < 7) {
    return { valid: false, error: "Сообщения слишко короткое", showError: true };
  }
  return { valid: true, error: null, showError: false };
};


import Vue from 'vue';
new Vue({
  el: '#reviews-form',
  data() {
    return {
      messages: {
        email: '',
        name: '',
        desc: ''
      },
      valid: true,
      success: false,
      errors: {},
      message: null,
      showError: {
        name: false,
        email: false,
        desc: false
      }
    }
  },
  computed: {    
    
  },
  methods: {
    submit() {
      this.errors = {}

      const validName = validateName(this.messages.name);
      this.errors.name = validName.error;
      this.showError.name = validName.showError;
      if (this.valid) {
        this.valid = validName.valid
        console.log(this.valid);
      }

      const validEmail = validateEmail(this.messages.email);
      this.errors.email = validEmail.error;
      this.showError.email = validEmail.showError;
      if (this.valid) {
        this.valid = validEmail.valid
      }

      const validDesc = validateDesc(this.messages.desc)
      this.errors.desc = validDesc.error;
      this.showError.desc = validDesc.showError;
      if (this.valid) {
        this.valid = validDesc.valid
      }
      if (this.valid) {
        alert('HURRAAYYY!! :-)\n\n' + JSON.stringify(this.messages)) 
               
      }     
    }
  }
});
