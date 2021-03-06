import {client, localStorageKey} from './api-client'
import * as url from "../utils/constants";
import {queryCache} from "react-query";
import toastr from "toastr";

async function handleUserResponse(data) {
  console.log("data ", data)
  window.localStorage.setItem(localStorageKey, data.token);
  const user = await getUser();
  if (user) {
    return user
  }
}
function login({email, password}) {
  return client(url.LOGIN_URL, {data: {email, password}}).then(handleUserResponse)
}
function register({username, password}) {
  return client('register', {data: {username, password}}).then(
    handleUserResponse,
  )
}
function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/auth/user`, {data: {token}}).then(data => {
    console.log("GET_USER ", data)
    if (data.status === "success") {
      return data.user
    } else {
      toastr.error(data.error);
      window.localStorage.clear();
      return null
    }
  })
}
function getCategory(page) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/category?page=${page}`).then(data => data)
}
function createCategory(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/category/create`, {data}).then(data => data)
}
function updateCategory(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/category/update`, {data}).then(data => data)
}
function uploadCategoryCsv(data) {
  const token = getToken();
  let type = "image"
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/upload-category-csv`, {data, type}).then(data => data)
}
function createProductType(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/product-type/create`, {data}).then(data => data)
}
function getProductType() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/product-type`).then(data => data)
}
function updateProductType(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/product-type/update`, {data}).then(data => data)
}
function uploadProductTypeCsv(data) {
  const token = getToken();
  let type = "image"
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/upload-product-type-csv`, {data, type}).then(data => data)
}
function createProduct(data) {
  let type = "image"
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/create`, {data, type}).then(data => data)
}
function updateProduct(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/update`, {data}).then(data => data)
}
function updateImage(data) {
  const token = getToken();
  let type = "image"
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/update-image`, {data, type}).then(data => data)
}
function uploadProductCsv(data) {
  const token = getToken();
  let type = "image"
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/upload-product-csv`, {data, type}).then(data => data)
}
function uploadVariantCsv(data) {
  const token = getToken();
  let type = "image"
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/upload-variant-csv`, {data, type}).then(data => data)
}
function removeVariant(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/delete-variant`, {data}).then(data => data)
}
function updateVariant(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/update-variant`, {data}).then(data => data)
}
function getProducts(page) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products?page=${page}`).then(data => data)
}
function removeProduct(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  console.log(data)
  return client(`${url.BASE_URL}/products/delete`, {data}).then(data => data)
}
function getProductById(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/products/get/${data}`).then(data => data)
}
function getAllUsers() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/users/all-users`).then(data => data)
}
function getRegistrations() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/registrations`).then(data => data)
}
function registerUser(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/auth/user/register`, {data}).then(data => data)
}
function removeRegistration(data) {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  console.log(data)
  return client(`${url.BASE_URL}/registration-remove`, {data}).then(data => data)
}

function getToken() {
  let token = window.localStorage.getItem(localStorageKey);
  if (token) {
    return token
  }
  return null
}


function isLoggedIn() {
  return Boolean(getToken())
}

function logout() {
  queryCache.clear();
  window.localStorage.removeItem(localStorageKey);
}


export {login, register, getToken, isLoggedIn, getUser, getCategory, createCategory,
  registerUser, getAllUsers, createProduct, getProductType, createProductType, getProducts,
  removeProduct, getProductById, updateProduct, updateImage, uploadProductCsv, uploadVariantCsv,
  removeVariant, updateVariant, updateCategory, uploadCategoryCsv, updateProductType, uploadProductTypeCsv,
  getRegistrations, removeRegistration}
export {logout} from './api-client'
