export const initTreeChart = (jsonObj, dept) => {
    const data = formatData(jsonObj, dept);

    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        legend: {
            top: '2%',
            left: '3%',
            orient: 'vertical',
            data: [{
                name: 'tree',
                icon: 'rectangle'
            }]
        },
        series:[
            {
                type: 'tree',
    
                name: 'tree',
    
                data: [data],
    
                top: '5%',
                left: '7%',
                bottom: '2%',
                right: '60%',
    
                symbolSize: 7,
    
                label: {
                    position: 'top',
                    verticalAlign: 'middle',
                    align: 'right',
                    color: '#4f2683',
                    padding: 6 
                },
    
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
    
                expandAndCollapse: true,
            }
        ]
    };

    return option;
}

const formatData = (jsonObj, dept) => {
    const result = {};
    result.name =  dept;
    result.lineStyle = {color: 'gray'}
    result.children = [];

    const first = {};
    first.name = 'First Year';
    first.lineStyle = {color: 'gray'}
    first.children = [];
 
    for(let i=0;i<jsonObj.length;i++){
        if(Number(jsonObj[i].code.split(" ")[1][0]) === 1){
            const str = stringifyPrereqs(jsonObj[i].course.preq);
       
            first.children.push({
                name: jsonObj[i].code,
                lineStyle: {color: 'gray'},
                value: str
            });
        }
    }

    const second = {};
    second.name = 'Second Year';
    second.lineStyle = {color: 'gray'}
    second.children = [];
 
    for(let i=0;i<jsonObj.length;i++){
        if(Number(jsonObj[i].code.split(" ")[1][0]) === 2){
            
            second.children.push({
                name: jsonObj[i].code,
                value: stringifyPrereqs(jsonObj[i].course.preq),
                lineStyle : {color: 'gray'}
            });
        }
    }

    const third = {};
    third.name = 'Third Year';
    third.lineStyle = {color: 'gray'}
    third.children = [];
 
    for(let i=0;i<jsonObj.length;i++){
        if(Number(jsonObj[i].code.split(" ")[1][0]) === 3){
            
            third.children.push({
                name: jsonObj[i].code,
                value: stringifyPrereqs(jsonObj[i].course.preq),
                lineStyle : {color: 'gray'}
            });
        }
    }

    const fourth = {};
    fourth.name = 'Fourth Year';
    fourth.lineStyle = {color: 'gray'}
    fourth.children = [];

    for(let i=0;i<jsonObj.length;i++){
        if(Number(jsonObj[i].code.split(" ")[1][0]) === 4){
            
            fourth.children.push({
                name: jsonObj[i].code,
                value: stringifyPrereqs(jsonObj[i].course.preq),
                lineStyle : {color: 'gray'}
            });
        }
    }

    result.children.push(first);
    result.children.push(second);
    result.children.push(third);
    result.children.push(fourth);
    
    return result;
}

const stringifyPrereqs = (preq) => {
    let str = '';

    for(let i=0;i<preq.length;i++){
        str += preq[i] + '\n';
    }

    return str;
}