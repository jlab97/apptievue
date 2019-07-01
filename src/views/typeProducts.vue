<template>
    <div>
        <b-row class="pt-4">
            <b-col md="5" >
                <b-card title="Marcas">
                    <b-card-text>
                        <b-form @submit.prevent="sendTypeProduct">
                            <b-form-group>
                            <b-form-input type="text" placeholder="id de la categoría" v-model="typeProduct.idtypeprod" disabled/>
                            </b-form-group>
                            <b-form-group>
                            <b-form-input type="text" placeholder="nombre de la categoría" v-model="typeProduct.nametypeprod" required/>
                            </b-form-group>
                            <template v-if="!editTP"><button class="btn btn-primary btn-block">guardar</button></template>
                            <template v-else><button class="btn btn-primary btn-block">actualizar</button><button class="btn btn-warning btn-block" @click="editTP=false;typeProduct={}">cancelar</button></template>
                        </b-form>
                    </b-card-text>
                </b-card>
            </b-col>
            <b-col md="7">
                <table class="table table-bordered">
                <thead class="thead-light">
                <tr>
                <th scope="col">id</th>
                <th scope="col">categoria</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(type,i) of typeProd" :key="i">
                <td>{{type.idtypeprod}}</td>
                <td>{{type.nametypeprod}}</td>
                <td scope="row"><button class="btn btn-secondary" @click="editTypeProduct(type,i)">editar</button></td>
                <td scope="row"><button class="btn btn-danger" @click="deleteTypeProduct(type)">eliminar</button></td>
                </tr>
                </tbody>
                </table>
            </b-col>
        </b-row>        
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            typeProduct:{},
            editTP:false
        }
    },
    created(){
        this.getTypeProd()
    },
    computed:{
        ...mapState(['typeProd'])
    },
    methods:{
        sendTypeProduct(){
            let fd = this.toFormData(this.typeProduct)
            if(this.editTP){
                if (confirm(`está seguro que desea actualizar la categoría: ${this.typeProd[this.typeProduct.in].nametypeprod}`)) {
                    this.axios.post('http://localhost/apptie/typeProducts.php?action=update',fd)
                    .then(res=>{
                        this.typeProduct={}
                        this.getTypeProd()
                        console.log(res.data.message)
                    })
                }                
            }else{
                this.axios.post('http://localhost/apptie/typeProducts.php?action=create',fd)
                .then(res=>{
                    this.typeProduct={}
                    this.getTypeProd()
                    console.log(res.data.message)
                })
            }
        },
        editTypeProduct(obj,i){
            this.typeProduct={...obj}
            this.typeProduct.in=i
            this.editTP=true
        },
        deleteTypeProduct(obj){
            let fd = this.toFormData(obj)
            if(confirm(`está seguro que desea eliminar la categoria ${obj.nametypeprod}?`)){
                this.axios.post('http://localhost/apptie/typeProducts.php?action=delete',fd)
                .then(res=>{
                    this.getTypeProd()
                    console.log(res.data.message)
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
        ...mapActions(['getTypeProd'])
    }
}
</script>

