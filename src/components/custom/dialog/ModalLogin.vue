<template>
<modal name="gustavo" transition="pop-out" :width="modalWidth" :focus-trap="true" :height="400">
  <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">CREAR CUENTA</div>
        <div class="partition-form">
          <form autocomplete="false">

            <div class="autocomplete-fix">
              <input disabled type="password">
            </div>

            <input id="n-email" type="text" placeholder="Correo">
            <input id="n-username" type="text" placeholder="Usuario">
            <input id="n-password2" type="password" placeholder="Clave">
          </form>

          <div style="margin-top: 42px">
          </div>

          <div class="button-set">
            <button id="goto-signin-btn" @click="signIn">Ir a Login</button>
            <button id="register-btn" @click="register">Registrarse</button>
          </div>

          <button class="large-btn github-btn">Ingresar con <span>github</span></button>
          <button class="large-btn facebook-btn">Ingresar con <span>facebook</span></button>
        </div>
      </div>
    </div>
    <div class="box-part" id="bp-right">
      <div class="box-messages">
      </div>
    </div>
  </div>
</modal>
</template>

<script>
const MODAL_WIDTH = 656

export default {
  name: 'DemoLoginModal',
  data() {
    return {
      modalWidth: MODAL_WIDTH
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
  },
  methods: {
    signIn() {
      alert('Sign in')
    },
    register() {
      alert('Register')
    }
  }
}
</script>

<style>
.box {
   background: white;
   overflow: hidden;
   width: 656px;
   height: 400px;
   border-radius: 2px;
   box-sizing: border-box;
   box-shadow: 0 0 40px black;
   color: #8b8c8d;
   font-size: 0;
}
 .box .box-part {
   display: inline-block;
   position: relative;
   vertical-align: top;
   box-sizing: border-box;
   height: 100%;
   width: 50%;
}
 .box .box-part#bp-right {
   background: url('../../../assets/panorama.jpg') no-repeat top left;
   border-left: 1px solid #eee;
}
 .box .box-messages {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 100%;
}
 .box .box-error-message {
   position: relative;
   overflow: hidden;
   box-sizing: border-box;
   height: 0;
   line-height: 32px;
   padding: 0 12px;
   text-align: center;
   width: 100%;
   font-size: 11px;
   color: white;
   background: #f38181;
}
 .box .partition {
   width: 100%;
   height: 100%;
}
 .box .partition .partition-title {
   box-sizing: border-box;
   padding: 30px;
   width: 100%;
   text-align: center;
   letter-spacing: 1px;
   font-size: 20px;
   font-weight: 300;
}
 .box .partition .partition-form {
   padding: 0 20px;
   box-sizing: border-box;
}
 .box input[type='password'], .box input[type='text'] {
   display: block;
   box-sizing: border-box;
   margin-bottom: 4px;
   width: 100%;
   font-size: 12px;
   line-height: 2;
   border: 0;
   border-bottom: 1px solid #dddedf;
   padding: 4px 8px;
   font-family: inherit;
   transition: 0.5s all;
}
 .box button {
   background: white;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   letter-spacing: 1px;
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   min-width: 140px;
   margin-top: 8px;
   color: #8b8c8d;
   cursor: pointer;
   border: 1px solid #dddedf;
   text-transform: uppercase;
   transition: 0.1s all;
   font-size: 10px;
}
 .box button:hover {
   border-color: #c7c8c9;
   color: #6f7071;
}
 .box .large-btn {
   width: 100%;
   background: white;
}
 .box .large-btn span {
   font-weight: 600;
}
 .box .large-btn:hover {
   color: white !important;
}
 .box .button-set {
   margin-bottom: 8px;
}
 .box #register-btn, .box #signin-btn {
   margin-left: 8px;
}
 .box .facebook-btn {
   border-color: #3880ff;
   color: #3880ff;
}
 .box .facebook-btn:hover {
   border-color: #3880ff;
   background: #3880ff;
}
 .box .github-btn {
   border-color: #dba226;
   color: #dba226;
}
 .box .github-btn:hover {
   border-color: #dba226;
   background: #dba226;
}
 .box .autocomplete-fix {
   position: absolute;
   visibility: hidden;
   overflow: hidden;
   opacity: 0;
   width: 0;
   height: 0;
   left: 0;
   top: 0;
}
 .pop-out-enter-active, .pop-out-leave-active {
   transition: all 0.5s;
}
 .pop-out-enter, .pop-out-leave-active {
   opacity: 0;
   transform: translateY(24px);
}

</style>

