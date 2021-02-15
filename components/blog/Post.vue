<template>
  <div class="card card-blog">
    <div class="img">
      <img class="lazyload" :data-src="storageUrl+'/img/posts/'+el.thumbnail" :alt="el.category['name_'+$i18n.locale]" />
      <nuxt-link :to="localePath({ name: 'blog-category-category-post', params: { category: el.category['slug_'+$i18n.locale] ,post: el['slug_'+$i18n.locale] } })"><i class="flaticon-cancelar"></i></nuxt-link>
    </div>
    <nuxt-link :to="localePath({ name: 'blog-category-category-post', params: { category: el.category['slug_'+$i18n.locale] ,post: el['slug_'+$i18n.locale] } })"><h4>{{ el['title_'+$i18n.locale]}}</h4></nuxt-link>
    <p>
      {{ el['excerpt_'+$i18n.locale]}}
    </p>
    <div class="tag">
      <div class="categoria"><i class="flaticon-label"> </i> {{ el.category['name_'+$i18n.locale]}}</div>
      <div class="calendario">
        <i class="flaticon-calendario"> </i> {{ el.date_format}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    el: Object,
  },
  data() {
    return {
      storageUrl: process.env.STORAGE_URL,
    };
  },
};
</script>