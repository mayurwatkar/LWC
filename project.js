import { LightningElement, wire, track , api} from 'lwc';
import getProjects from '@salesforce/apex/SearchController.getProjects';
import getClusters from '@salesforce/apex/SearchController.getClusters';
import getTowers from '@salesforce/apex/SearchController.getTowers';
import getWings from '@salesforce/apex/SearchController.getWings';
import getUnits from '@salesforce/apex/SearchController.getUnits';
let i = 0;
const columns = [
    {label: 'Label', fieldName: 'Name', type: 'text'},
]
export default class AssignmentLwc extends LightningElement{

//-----------------------------------------------------------Project---------------------------------------------------------//
     value= '';
     project = '';
     @track arr = [];

    get poptions(){
        console.log('arr ' + this.arr);
        return this.arr;
    }

    @wire(getProjects)
        wiredProjects({error, data}){
            if (data){
            console.log(data);
                for( i=0 ; i<data.length; i++){
                    console.log('Name '+ data[i].name);
                   this.arr = [...this.arr,{label : data[i].Name, value : data[i].Id}];
            }
            this.error = undefined;
            }
            else if (error) {
                this.error = error;
             this.arr = undefined;
                }
            }
    handleChangedProject(event){
            this.project= event.detail.value;
            console.log('this is selected ProjectId:::' + this.project);
    }
//-----------------------------------------------------------Cluster---------------------------------------------------------//
value= '';
cluster = '';
@track arrc = [];

get coptions(){
    console.log('arr ' + this.arrc);
    return this.arrc;
}

@wire(getClusters, {projectid: '$project'})
    wiredClusters({error, data}){
        if (data){
        console.log(data);
            for( i=0 ; i<data.length; i++){
                console.log('Name '+ data[i].name);
               this.arrc = [...this.arrc,{label : data[i].Name, value : data[i].Id}];
        }
        this.error = undefined;
        }
        else if (error) {
            this.error = error;
         this.arrc = undefined;
            }
        }
handleChangedCluster(event){
        this.cluster= event.detail.value;
        console.log('this is selected clusterId:::' + this.cluster);
}
//-----------------------------------------------------------Tower---------------------------------------------------------//
value= '';
tower = '';
@track arrt = [];

get toptions(){
    console.log('arr ' + this.arrt);
    return this.arrt;
}

@wire(getTowers, {clusterid: '$cluster'})
    wiredTowers({error, data}){
        if (data){
        console.log(data);
            for( i=0 ; i<data.length; i++){
                console.log('Name '+ data[i].name);
               this.arrt = [...this.arrt,{label : data[i].Name, value : data[i].Id}];
        }
        this.error = undefined;
        }
        else if (error) {
            this.error = error;
         this.arrt = undefined;
            }
        }
handleChangedTower(event){
        this.tower= event.detail.value;
        console.log('this is selected towerId:::' + this.tower);
}
//-----------------------------------------------------------Wing---------------------------------------------------------//
value= '';
wing = '';
@track arrw = [];
@track data= [];
@track columns = columns;
@track isVisible = false;

get woptions(){
    console.log('arr ' + this.arrw);
    return this.arrw;
}

@wire(getWings, {towerid: '$tower'})
    wiredWings({error, data}){
        if (data){
        console.log(data);
            for( i=0 ; i<data.length; i++){
                console.log('Name '+ data[i].name);
               this.arrw = [...this.arrw,{label : data[i].Name, value : data[i].Id}];
        }
        this.error = undefined;
        }
        else if (error) {
            this.error = error;
         this.arrw = undefined;
            }
        }
        handleChangedWing(event){
            this.wing= event.detail.value;
        console.log('this is selected wingId:::' + this.wing);
        this.isVisible = true; // Unit box show/Hide
        }

//-----------------------------------------------------------unit Data Table---------------------------------------------------------//
@track data = [];
@track error;

    @wire(getUnits)fetchData(value) {
		const {data,error} = value;
		if (data) {
            let result = JSON.parse(JSON.stringify(data));
            console.log('result==> ' + JSON.stringify(result));
            for(var i=0; i<result.length; i++){
                result[i].rowNumber = i+1;
            }
             this.data = result;
        }
        else if(error){
            console.log(error);
            this.data = [];
        }
    }
        }