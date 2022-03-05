Vue.component('server-error', {
    props: ['visible'],
    template:`
      <div v-if="visible">
        <p>Не удается получить спиок товаров с сервера! Возможно сервер сейчас недоступен, либо чересчур перегружен, либо возникли проблемы с интернет-подключением!</p>
      </div>
    `
  })

  export default {
      servererror: 'server-error',
  }