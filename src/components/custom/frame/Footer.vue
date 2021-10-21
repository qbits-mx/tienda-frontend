<template>
    <footer class="kilimanjaro_area"> 

        <div v-if=show>

            <div class="foo_top_header_one section_padding_100_10">
                <div class="container">
                    <div class="row">                
                        FOOTER
                    </div>
                </div>
            </div>

            <!-- Footer Bottom Area Start -->
            <div class=" kilimanjaro_bottom_header_one section_padding_50 text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <p>© Todos los derechos reservados. 2021<br/>Sitio desarrollado por: <br/><a href="https://curso-ing-soft.qbits.mx/" target="_blank" style="color:#27ae60;">Alumnos 2022-1 -(con amor) <i class="fa fa-heart rojo" aria-hidden="true"></i></a></p>
                            <button class="btn green" @click="$modal.show('demo-login')">Demo: Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal
            name="advertencia"
            :clickToClose="false"
            width=29%
            height="auto"> 
            <div class="caja-advertencia">
                <div class="row contenedor">
                    <div class="col-sm-6 izq">
                        <!-- Este sitio es sólo para mayores de edad y hace uso de cookies -->
                        <label>Este sitio hace uso de cookies</label>
                    </div>
                    <div class="col-sm-6 der">
                        <button class="btn btn-outline-success" @click="ok()">Aceptar</button>
                        &nbsp;
                        <a class="btn btn-outline-danger" href="https://www.google.com">Rechazar</a>
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="avisoPoliticaPrivacidad"
            :clickToClose="true"
            width=89%
            height="auto"> 
            <div class="caja-aviso">
                <div class="row contenedor">
                    <div class="col-sm-12">
                        <p>Aviso Política de Privacidad</p>
                        <p>Texto asociado</p>
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="condiciones"
            :clickToClose="true"
            width=89%
            height="auto"> 
            <div class="caja-aviso">
                <div class="row contenedor">
                    <div class="col-sm-12">
                        <p>Condiciones de Uso</p>
                        <p>Texto asociado</p>
                    </div>
                </div>
            </div>
        </modal>

        <modal
            name="galletas"
            :clickToClose="true"
            width=89%
            height="auto"> 
            <div class="caja-aviso">
                <div class="row contenedor">
                    <div class="col-sm-12">
                        <p>Aviso de Cookies</p>
                        <p>Texto asociado</p>
                    </div>
                </div>
            </div>
        </modal>

    </footer>
</template>

<script>
import store from '../../../store'

  export default { 
    methods: {
        aviso(name){
            this.$modal.show(name);
        },
        ok() {
            this.setCookie('law', true, 2);
            this.$modal.hide('advertencia');
        },
        getCookie: function(name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },
        setCookie: function(name, value, minutes) {
            var d = new Date;
            d.setTime(d.getTime() + minutes*60*1000);
            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        deleteCookie: function(name) { 
            this.setCookie(name, '', -1); 
        }
    },
    mounted() {
        var c = this.getCookie('law');
        if(c===null) {
            console.log('no hay');
            //this.setCookie('law', true, 2);
            this.$modal.show('advertencia');
        } else {
            console.log('si hay');
        }
    }, 
    computed: {
        show: function() {
            return store.state.toggleFooter;
        }
    }
  }
</script>

<style scoped>
.Cookie {
    background-color:rgb(60,60,60,0.5);
    height: 100%;
}
.der {
    padding-right: 0px;
    margin-right: 0px;
}
.izq {
    text-align: left;
}
.caja-advertencia {
    width: 100%;
    height: auto;
    text-align: right;
    background-color:#fff;
    padding:12px;
    border: 2px solid #b6b6b6;
    border-radius: 2px;
    margin:auto;
}
.caja-aviso {
    padding:12px;
    overflow-y: scroll;
    height: 500px;
}
.contenedor {
    padding-right:14px;
}
.margen-derecho {
  margin-right: 8px;
}
h4 {
      font-size: 1.2rem;
      color:#666666;
}
h5 {
    border-bottom: 1px solid #666666;
}
.rojo {
  color:#ff0000;
}
.verde {
  color: #27ae60;
}
a {
  color:#27ae60;
}
.kilimanjaro_area {
    position: relative;
    z-index: 1;
	}
	.foo_top_header_one {
    background-color: #15151e;
    color: #fff;
}
.section_padding_100_10 {
    padding-top: 100px;
    padding-bottom: 10px;
}
.foo_top_header_one {
    color: #fff;
}
.kilimanjaro_part {
    margin-bottom: 30px;
}
.foo_top_header_one .kilimanjaro_part > h5 {
    color: #fff;
}
.kilimanjaro_part h4, .kilimanjaro_part h5 {
    margin-bottom: 30px;
    padding-bottom: 10px;
}
.kilimanjaro_single_contact_info > p, .kilimanjaro_single_contact_info > h5, .kilimanjaro_blog_area > a, .foo_top_header_one .kilimanjaro_part > p {
    color: rgba(255,255,255,.5);
}
p, ul li, ol li {
    font-weight: 300;
}
ul {
    margin: 0;
    padding: 0;
}
.kilimanjaro_bottom_header_one {
    background-color: #111;
}
.section_padding_50 {
    padding: 50px 0;
}
.kilimanjaro_bottom_header_one p {
    color: #fff;
    margin: 0;
}
p, ul li, ol li {
    font-weight: 300;
}
.kilimanjaro_bottom_header_one a {
    color: inherit;
    font-size: 14px;
}
a, h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
}
.m-top-15 {
    margin-top: 15px;
}
ul {
    margin: 0;
    padding: 0;
}

.kilimanjaro_widget > li {
    display: inline-block;
}
p, ul li, ol li {
    font-weight: 300;
}
ol li, ul li {
    list-style: outside none none;
}
.kilimanjaro_widget a {
    border: 1px solid #333;
    border-radius: 6px;
    color: #888;
    display: inline-block;
    font-size: 13px;
    margin-bottom: 4px;
    padding: 7px 12px;
}
ul {
    margin: 0;
    padding: 0;
}
.kilimanjaro_links a {
    border-bottom: 1px solid #333;
    color: rgba(255,255,255,.5);
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
    padding-bottom: 10px;
}
.kilimanjaro_links a {
    color: rgba(255,255,255,.5);
    font-size: 13px;
}
top-15 {
    margin-top: 15px;
}
.foo_top_header_one .kilimanjaro_part > h5 {
    color: #fff;
}
.kilimanjaro_part h4, .kilimanjaro_part h5 {
    margin-bottom: 30px;
}
.kilimanjaro_social_links > li {
    display: inline-block;
}
p, ul li, ol li {
    font-weight: 300;
}
.kilimanjaro_social_links a {
    border: 1px solid #333;
    border-radius: 6px;
    color: #888;
    display: inline-block;
    font-size: 13px;
    margin-bottom: 3px;
    padding: 7px 12px;
}
.kilimanjaro_blog_area .kilimanjaro_date {
    color: #27ae60;
    font-size: 13px;
    margin-bottom: 5px;
}
.kilimanjaro_blog_area > p {
    color: rgba(255,255,255,.5);
    line-height: 1.3;
    margin-bottom: 0;
}
.kilimanjaro_works > a {
    display: inline-block;
    float: left;
    position: relative;
    width: 33.33333333%;
    z-index: 1;
}
.kilimanjaro_thumb {
    left: 0;
    position: absolute;
    top: 0;
    width: 75px;
}
.kilimanjaro_links a i {
    padding-right: 10px;
}
  /* :: 18.0 Footer Area CSS */

    .footer_area {
        position: relative;
        z-index: 1;
    }
 .footer_bottom p > i,
    .footer_bottom p > a:hover {
        color: #27ae60;
    }	

    .social_links_area {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 50px 0 30px 0;
        text-align: center;
        position: relative;
        z-index: 1;
    }
 .social_links_area > a:hover {
        color: #27ae60;
    }

    .inline-style .social_links_area > a:hover {
        background-color: transparent;
        color: #27ae60;
        border: 0px solid transparent;
    }
 .single_feature:hover .feature_text h4 {
        color: #27ae60;
    }
.kilimanjaro_blog_area {
    border-bottom: 1px solid #333;
    margin-bottom: 15px;
    padding: 0 0 15px 90px;
    position: relative;
    z-index: 1;
}
.kilimanjaro_links a {
    border-bottom: 1px solid #333;
    color: rgba(255,255,255,.5);
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
    padding-bottom: 10px;
}
.btn-outline-danger {
    color:rgb(245, 73, 73);
}
.btn-outline-danger:hover {
    color:#fff;
}
</style>