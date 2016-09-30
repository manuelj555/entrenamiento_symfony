let aaa = 'MMM';
const bbb = {};

var loginApp = new Vue({
    el: '#login-form',
    data () {
        return {
            error: null,
            message: null,
            messageType: null,
            generateCodeLabel: 'Enviarme un Código',
            disableButtons: false,
            email: null,
        };
    },
    methods: {
        initalState () {
            this.disableButtons = true;
            this.generateCodeLabel = 'Enviando Código...';
            this.message = null;
            this.messageType = null;
            this.error = null;
        },
        generateCode  (url) {
            this.initalState();
            $.post(url, {email: this.email}).done(this.onGenerateCodeSuccess.bind(this));
        },
        showInexistentEmailError () {
            this.addMessage('danger', 'Este correo electrónico no se encuentra registrado en la aplicación', 5000);
        },
        onGenerateCodeSuccess (response) {
            this.disableButtons = false;

            if (response === 'no-email') {
                this.showInexistentEmailError();
            } else {
                this.generateCodeLabel = 'Enviarme un Código';
                this.addMessage('success', `Un mensaje ha sido enviado a la cuenta de correo: <b>
                    %email%
                    </b>. Usted dispone de 1 minuto antes de que la validez del código caduque.`.replace('%email%', this.email),
                    60000
                );
            }
        },
        addMessage (type, message, time) {
            this.messageType = type;
            this.message = message;
            setTimeout(() => {
                this.messageType = null;
                this.message = null;
            }, time || 5000);
        },
    },
});