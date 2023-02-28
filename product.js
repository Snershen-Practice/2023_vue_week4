import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';
import pagination from './vue-component.js';
import { vueProductModal } from './vue-component.js';
import { vueDeleteModal } from './vue-component.js';

const baseUrl = 'https://vue3-course-api.hexschool.io';
const api_path = 'sport-course';

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false, //確認視窗是編輯還是新增產品
      page: {},
    };
  },
  components: {
    pagination,
    vueProductModal,
    vueDeleteModal,
  },
  methods: {
    checkLogin() {
      const apiUrl = `${baseUrl}/v2/api/user/check`;
      axios
        .post(apiUrl)
        .then((res) => {
          // console.log(res);
          this.getProduct();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = 'login.html';
        });
    },
    getProduct(page = 1) {
      const apiUrl = `${baseUrl}/v2/api/${api_path}/admin/products/?page=${page}`;
      axios.get(apiUrl).then((res) => {
        // console.log(res);
        this.products = res.data.products;
        // console.log(this.products);
        this.page = res.data.pagination;
        // console.log(res.data);
      });
    },
    //參數是用來確認視窗處於哪種狀態，並傳入單一產品資訊
    openModal(status, item) {
      //   console.log(status);
      if (status === 'create') {
        productModal.show();
        this.isNew = true;
        //判斷是新增產品，初始化。若無初始化，裡面會代入其他產品的資訊
        this.tempProduct = {
          imagesUrl: [],
        };
      } else if (status === 'edit') {
        productModal.show();
        this.isNew = false;
        //判斷是編輯產品，所以在欄位中代入該產品資訊
        this.tempProduct = { ...item };
      } else if (status === 'delete') {
        delProductModal.show();
        this.tempProduct = { ...item };
      }
    },
    updateProduct() {
      let apiUrl = `${baseUrl}/v2/api/${api_path}/admin/product`;
      let method = 'post';
      //透過判斷 isNew 的值，來確認是編輯還是新增產品，並更改 API 路徑與方法
      if (!this.isNew) {
        apiUrl = `${baseUrl}/v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      //透過物件取值的方式串接 API
      axios[method](apiUrl, { data: this.tempProduct }).then((res) => {
        // console.log(res);
        //再次渲染產品列表
        this.getProduct();
        productModal.hide();
      });
    },
    deleteProduct() {
      const apiUrl = `${baseUrl}/v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
      axios.delete(apiUrl).then((res) => {
        //再次渲染產品列表
        this.getProduct();
        delProductModal.hide();
      });
    },
  },
  mounted() {
    //將 cookie 取出，並代入到 request 的 header 裡
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)sportToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
    // Bootstrap
    // 1. 初始化
    productModal = new bootstrap.Modal('#productModal');
    // 2. 呼叫方法
    // productModal.show();
    // ---
    delProductModal = new bootstrap.Modal('#delProductModal');
  },
});

app.mount('#app');
