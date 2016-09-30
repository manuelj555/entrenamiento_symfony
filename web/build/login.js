'use strict';

var aaa = 'MMM';
var bbb = {};

var loginApp = new Vue({
    el: '#login-form',
    data: function data() {
        return {
            error: null,
            message: null,
            messageType: null,
            generateCodeLabel: 'Enviarme un Código',
            disableButtons: false,
            email: null
        };
    },

    methods: {
        initalState: function initalState() {
            this.disableButtons = false;
            this.message = null;
            this.messageType = null;
            this.error = null;
            this.generateCodeLabel = 'Enviarme un Código';
        },
        generateCode: function generateCode(url) {
            this.initalState();

            if (!this.email || '' == this.email.trim()) {
                return;
            }

            this.disableButtons = true;
            this.generateCodeLabel = 'Enviando Código...';
            $.post(url, { email: this.email }).done(this.onGenerateCodeSuccess.bind(this));
        },
        showInexistentEmailError: function showInexistentEmailError() {
            this.addMessage('danger', 'Este correo electrónico no se encuentra registrado en la aplicación', 5000);
        },
        onGenerateCodeSuccess: function onGenerateCodeSuccess(response) {
            this.disableButtons = false;

            if (response === 'no-email') {
                this.showInexistentEmailError();
            } else {
                this.generateCodeLabel = 'Enviarme un Código';
                this.addMessage('success', 'Un mensaje ha sido enviado a la cuenta de correo: <b>\n                    %email%\n                    </b>. Usted dispone de 1 minuto antes de que la validez del código caduque.'.replace('%email%', this.email), 60000);
            }
        },
        addMessage: function addMessage(type, message, time) {
            var _this = this;

            this.messageType = type;
            this.message = message;
            setTimeout(function () {
                _this.messageType = null;
                _this.message = null;
            }, time || 5000);
        }
    }
});