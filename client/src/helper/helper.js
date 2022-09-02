import _ from 'lodash'

export function getSum(trasaction,type){
    let sum=_(trasaction)
            .groupBy('type')
            .map((objs,key)=>{
                if(!type)return _.sumBy(objs,'amount');
              return{
                'type':key,
                'color':objs[0].color,
                'total':_.sumBy(objs,'amount')
              }
            })
            .value()
         return sum;
}

export function getLabels(trasaction){
    let amountSum=getSum(trasaction,'type');
    let Total=_.sum(getSum(trasaction))
    let percent=_(amountSum)
                .map(objs=>_.assign(objs,{percent:(100*objs.total)/Total}))
                .value()

                return percent;
   

}

export function chart_Data(trasaction,custom)
{
  let dataValue=getSum(trasaction)

  let bg=_.map(trasaction,a=>a.color)
  bg=_.uniq(bg)

  console.log(bg)
  const  config={
    data:{
        datasets: [{
            data: dataValue,
            backgroundColor: bg,
            hoverOffset: 4,
            borderRadius:30,
            spacing:10

          }]
    },
    options:{
        cutout:115
    }
  }
  return custom??config;
}

export function getTotal(trasaction){
  return _.sum(getSum(trasaction));
}