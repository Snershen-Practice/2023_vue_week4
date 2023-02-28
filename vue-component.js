export default {
  props: ['pagination', 'getProduct'],
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: !pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click="getProduct(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" :class = "{active: item === pagination.current_page}" v-for="(item,index) in pagination.total_pages" key = "page + 'page'"><a class="page-link" href="#" @click="getProduct(item)">{{item}}</a></li>
      
      <li class="page-item"  :class="{disabled: !pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next" @click="getProduct(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
};

//元件：新增/編輯產品視窗
export const vueProductModal = {
  props: ['tempProduct', 'updateProduct'],
  template: ` <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
              <h4>多圖設置</h4>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <template v-for="(img,key) in tempProduct.imagesUrl" :key="key+1234">
                  <input type="text" class="form-control mb-1" v-model="tempProduct.imagesUrl[key]" />
                  <img alt="" class="img-fluid mb-3" :src="tempProduct.imagesUrl[key]" />
                </template>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="tempProduct.imagesUrl.push('')"
                  v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                  !tempProduct.imagesUrl.length"
                >
                  新增圖片
                </button>
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="tempProduct.imagesUrl.pop()"
                  v-else
                >
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>
  
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>
  
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
              </div>
              <hr />
  
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>`,
};

//元件：刪除產品視窗
export const vueDeleteModal = {
  props: ['tempProduct', 'deleteProduct'],
  template: ` <div
  id="delProductModal"
  ref="delProductModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="delProductModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
      </div>
    </div>
  </div>
</div>`,
};
