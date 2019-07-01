<template>
    <div>
        <b-row class="pt-4">
            <b-col md="5" >
                <b-card title="Marcas">
                    <b-card-text>
                        <b-form @submit.prevent="sendBrand">
                            <b-form-group>
                                <b-form-input type="text" placeholder="código" disabled v-model="brand.idbrand"/>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input type="text" placeholder="nombre" required v-model="brand.namebrand"/>
                            </b-form-group>
                            <template v-if="!edBrand">
                                <button class="btn btn-primary btn-block">guardar</button>
                            </template>
                            <template v-else>
                                <button class="btn btn-primary btn-block">actualizar</button>
                                <button class="btn btn-warning btn-block" @click="edBrand=false;brand={}">cancelar</button>
                            </template>            
                        </b-form> 
                    </b-card-text>
                </b-card>
            </b-col>
            <b-col md="7">
                <b-card>
                    <table class="table table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th>código</th>
                                <th>nombre</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(br, i) of brands" :key="i">
                                <td>{{br.idbrand}}</td>
                                <td>{{br.namebrand}}</td>
                                <td scope="row"><button class="btn btn-secondary" @click="editBrand(br,i)">editar</button></td>
                                <td scope="row"><button class="btn btn-danger" @click="deleteBrand(br)">eliminar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return{
            brand:{},
            edBrand:false
        }
    },
    computed:{
        ...mapState(['brands'])
    },
    created(){
        this.getBrands()
    },
    methods:{
        sendBrand(){
            let fd = this.toFormData(this.brand)
            if(this.edBrand){
                if (this.brands[this.brand.i].namebrand!=this.brand.namebrand) {                
                    if (confirm(`está seguro que desea actualizar la marca:
${this.brands[this.brand.i].namebrand} a ${this.brand.namebrand}`)) {                    
                        this.axios.post('http://localhost/apptie/brands.php?action=update',fd)
                        .then(res=>{
                            //this.brand={}
                            this.getBrands()
                            this.edBrand=false
                        })
                    }
                }else{
                    alert('no hizo ningún cambio')
                }
            }else{
                this.axios.post('http://localhost/apptie/brands.php?action=create',fd)
                .then(res=>{
                    //this.brand={}
                    console.log(res.data.message)
                    this.getBrands()
                })
            }
        },
        deleteBrand(obj){
            let fd = this.toFormData(obj)
            this.axios.post('http://localhost/apptie/brands.php?action=delete',fd)
            .then(res=>{
                console.log(res.data.message)
                this.getBrands()
            })
        },
        editBrand(obj,ind){
            this.brand = {...obj}
            this.brand.i=ind
            this.edBrand=true
        },
        toFormData(obj){
            let fd = new FormData()
            for(let el in obj) {
                fd.append(el,obj[el])
            }
            return fd         
        },
        ...mapActions(['getBrands'])
    }
}
</script>

