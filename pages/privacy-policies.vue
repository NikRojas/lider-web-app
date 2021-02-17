<template>
  <main class="main_page">
    <Banner :banner="page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content_formatted.includes('image') ? 
                page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content.find((x) => x.field === 'image').value : ''" :title="page.data.content[page.data.content.findIndex(x => x.name === 'Banner')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale] ?
            page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale]
            : ''">
    </Banner>

    <section class="section">
      <div class="container">
        <div class="text text-justify">
          <p>
            <strong>LÍDER GRUPO CONSTRUCTOR</strong>, entidad dueña de la
            marca&nbsp;<strong>LÍDER</strong>, garantiza la seguridad y
            confidencialidad en el tratamiento de la información que nos
            brindes, considerada datos personales de acuerdo a la Ley 29733 -
            Ley de Protección de Datos Personales, su Reglamento, aprobado por
            Decreto Supremo N° 003-2013-JUS y/o sus normas reglamentarias,
            complementarias, modificatorias, sustitutorias y demás disposiciones
            aplicables (en adelante, la Ley).
          </p>
          <p>
            Toda información proporcionada a&nbsp;<strong>LÍDER</strong>&nbsp;a
            través de su sitio web o mediante las campañas digitales de Facebook
            o Google será objeto de tratamiento automatizado e incorporada en
            una o más bases de datos de las
            que&nbsp;<strong>LÍDER</strong>&nbsp;será titular y responsable,
            conforme a los términos previstos por la Ley.
          </p>
          <p>
            Al confirmar su consentimiento el usuario otorga autorización libre,
            expresa e inequívoca a&nbsp;<strong>LÍDER</strong>&nbsp;para
            realizar tratamiento y hacer uso de la información personal que éste
            proporcione a&nbsp;<strong>LÍDER</strong>&nbsp;cuando haga una
            consulta en línea, participe en promociones comerciales, envíe
            consultas o comunique incidencias, y en general cualquier
            interacción web, además de la información que se derive del uso de
            productos y/o servicios que pudiera tener contratados
            con&nbsp;<strong>LÍDER</strong>&nbsp;y de cualquier información
            pública o que pudiera recoger a través de fuentes de acceso público,
            incluyendo aquellos a los que&nbsp;<strong>LÍDER</strong>&nbsp;tenga
            acceso como consecuencia de su navegación por esta página web (en
            adelante, la “Información”) para las finalidades de envío de
            comunicaciones comerciales, comercialización de productos y
            servicios, y del mantenimiento de su relación contractual
            con&nbsp;<strong>LÍDER</strong>; todo ello de acuerdo a los términos
            que aquí se establecen.
          </p>
          <p>
            La política de privacidad de&nbsp;<strong>LÍDER</strong>&nbsp;le
            asegura al usuario el ejercicio de los derechos de información,
            acceso, actualización, inclusión, rectificación, supresión o
            cancelación, oposición y revocación del consentimiento, en los
            términos establecidos en la Ley. En cualquier momento, el usuario
            tendrá el derecho a solicitar a&nbsp;<strong>LÍDER</strong>&nbsp;el
            ejercicio de los derechos que le confiere la Ley, así como la
            revocación de su consentimiento según lo previsto en la Ley.
          </p>
          <p>
            <strong>LÍDER</strong>&nbsp;garantiza la confidencialidad en el
            tratamiento de los datos de carácter personal, así como haber
            adoptado los niveles de seguridad de protección de los datos
            personales, instalando todos los medios y adoptado todas las medidas
            técnicas, organizativas y legales a su alcance que garanticen la
            seguridad y eviten la alteración, pérdida, tratamiento o acceso no
            autorizado a los datos personales.
          </p>
          <p>
            Para cualquier consulta sobre los alcances de la política sobre
            protección de datos personales, o en caso los usuarios deseen
            ejercitar los derechos de información, de acceso, actualización,
            inclusión, rectificación, supresión o cancelación, oposición, a
            impedir el suministro, al tratamiento objetivo, u otros contemplados
            en la Ley sobre sus datos personales, podrán enviar un correo
            electrónico a: newplayer@playgroup.pe
          </p>
          <p>
            La información recopilada será almacenada en un banco de datos de
            propiedad de&nbsp;<strong>LÍDER</strong>.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../components/Banner";
export default {
    components:{
        Banner
    },
  nuxtI18n: {
    paths: {
      en: "/privacy-policies",
      es: "/politicas-privacidad",
    },
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/privacy-policies", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  data() {
    return {
      page: {},
    };
  },
};
</script>