window.onload = function(){
    new Vue({
        el:"#table",
        data:{
            flag:false, 
            obj:{
                title:'',
                user:'',
                date:'2021-06-21',
            },
            editObj:{}, 
            lists:[
                {title:'早上好',user:'xyz',date:'2021-04-21',id:1},
                {title:'标题2',user:'abc2',date:'2021-02-21',id:12},
                {title:'标题3',user:'abc2',date:'2021-03-21',id:3}
            ],

        },
        methods:{
            add(){  
                let {title,user,date} = this.obj;  
                
                if(!title || !user || !date) return;
                var _id = Math.max(...this.lists.map(item=>item.id))+1;  
                this.lists.push(
                    {title,user,date,id:_id},
                );
                
                this.obj = {};
            },
            del(index){ //删除
                this.lists.splice(index,1);  
                // this.lists = this.lists.filter(item=>item.id != list.id);
            },
            edit(list){ 
                this.flag = true;  
                this.editObj = {...list};
            },
            update() {
                for (let i = 0; i < this.lists.length; i++) {
                    if (this.lists[i].id == this.editObj.id) {
                        this.lists.splice(i, 1)
                        this.lists.push(this.editObj)
                    }
                }
                this.flag = false;
            }
        }
    })
}

// var a = 1;
// var b = a;
// a = 10;
// console.log(b);

// var obj1 = {id:1};
// var obj2 = obj1;
// obj1.id = 100;
// console.log(obj2.id);