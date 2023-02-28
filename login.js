import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';

const baseUrl = 'https://vue3-course-api.hexschool.io';

const app = {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const apiUrl = `${baseUrl}/v2/admin/signin`;
      axios
        .post(apiUrl, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `sportToken=${token}; expires=${expired};`;
          console.log(res);
          window.location = 'product.html';
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};

createApp(app).mount('#app');
