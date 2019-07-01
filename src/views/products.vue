<template>
    <b-row class="pt-4">
        <b-col md="4" >
            <b-card title="Productos">
                <b-card-text>
                    <b-form @submit.prevent="sendProduct">
                        <b-form-group>
                            <b-form-input
                            v-model="product.code"
                            type="text"
                            disabled
                            placeholder="código"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input
                            v-model="product.description"
                            type="text"
                            required
                            placeholder="descripción"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-select required v-model="product.typeprod" class="form-control">
                                <option :value="tp.idtypeprod" v-for="(tp, i) of typeProd" :key="i">{{tp.nametypeprod}}</option>
                            </b-form-select>
                        </b-form-group>
                        <b-form-group>
                            <b-form-select required v-model="product.brand" class="form-control">
                                <option :value="br.idbrand" v-for="(br, i) of brands" :key="i">{{br.namebrand}}</option>
                            </b-form-select>                     
                        </b-form-group>
                        <b-form-group>
                            <b-form-input
                            v-model="product.pricer"
                            type="text"
                            required
                            placeholder="precio minorista"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input
                            v-model="product.pricew"
                            type="text"
                            required
                            placeholder="precio mayorista"
                            ></b-form-input>
                        </b-form-group>
                        <template v-if="editProd">
                            <b-button type="submit" class="btn-block" variant="primary">actualizar</b-button>
                            <b-button class="btn-block pt-1" variant="warning" @click="editProd=false;product={}">cancelar</b-button>
                        </template>
                        <template v-else><b-button class="btn-block" type="submit" variant="primary">guardar</b-button></template>   
                    </b-form>  
                </b-card-text>
            </b-card>
        </b-col>
        <b-col md="8">                
            <table class="table table-sm table-striped table-responsive">
                <thead  class="thead-light">
                    <tr>
                        <th scope="col">código</th>
                        <th scope="col">descripción</th>
                        <th scope="col">tipo</th>
                        <th scope="col">marca</th>
                        <th scope="col">precio<br>mayorista</th>
                        <th scope="col">precio<br>minorista</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prod, i) of products" :key="i">
                        <td>{{prod.code}}</td>
                        <td>{{prod.description}}</td>
                        <td>{{(typeProd.find(tp => tp.idtypeprod == prod.typeprod)!=undefined)?typeProd.find(tp => tp.idtypeprod == prod.typeprod).nametypeprod:null}}</td>
                        <td>{{(brands.find(br => br.idbrand == prod.brand)!=undefined)?brands.find(br => br.idbrand == prod.brand).namebrand:null}}</td>
                        <td  scope="row">{{prod.pricew}}</td>
                        <td  scope="row">{{prod.pricer}}</td>
                        <td><b-button @click="editProduct(prod)" size="sm">editar</b-button></td>
                        <td><b-button v-if="!editProd" @click="deleteProduct(prod)" size="sm" variant="danger">eliminar</b-button></td>
                        <!--
                        <td ><button class="btn btn-primary btn-sm" @click="editProduct(prod)"><i class="material-icons md-18">create</i></button></td>
                        <td ><button class="btn btn-danger btn-sm" v-if="!editProd" @click="deleteProduct(prod)"><i class="material-icons md-18">delete</i></button></td>-->
                    </tr>
                </tbody>
            </table>              
        </b-col>
    </b-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data(){
    return {
      product:{},
      products:[],
      editProd: false
    }
  },
  computed:{
      ...mapState(['brands','typeProd'])
  },
  created(){
    this.getProducts()
    this.getTypeProd()
    this.getBrands()
  },
  methods:{
    sendProduct(){
      
      let fd =this.toFormData(this.product)
      if(this.editProd){ 
        if(confirm('¿está seguro que desea actualizar el producto?')){
          this.axios.post('http://localhost/apptie/products.php?action=update',fd)
          .then(res=>{
            this.product={}
            if(res.data.error){
              console.log(res.data.message)  
            }else{
              console.log(res.data.message)        
              this.getProducts()
            } 
            this.editProd=false       
          })
        }
      }else{
          this.axios.post('http://localhost/apptie/products.php?action=create',fd)
        .then(res=>{
          this.product={}
          if(res.data.error){
            console.log(res.data.message)  
          }else{
            console.log(res.data.message)        
            this.getProducts()
          }        
        })
      }
    },
    getProducts(){
      this.axios.post('http://localhost/apptie/products.php?action=read')
      .then(res=>{        
        if(res.data.error){
          console.log(res.data.message)  
        }else{      
          this.products = res.data.products
        }
      })
    },
    editProduct(prod){
      this.product={...prod}
      this.editProd=true
    },
    deleteProduct(prod){
      if (confirm('¿está seguro que desea eliminar el producto?')) {
        let fd =this.toFormData(prod)
        this.axios.post('http://localhost/apptie/products.php?action=delete',fd)
        .then(res=>{
          if(res.data.error){
            console.log(res.data.message)  
          }else{
            console.log(res.data.message)        
            this.getProducts()
          }
        })
      }
      
    },
    toFormData(obj){
      let fd = new FormData()
      for(let el in obj){
        fd.append(el,obj[el])
      }
      return fd
    },
    ...mapActions(['getTypeProd']),
    ...mapActions(['getBrands'])
  }
}
</script>

