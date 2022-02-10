const getClassNames=(from,...classes)=>{
    let array=[...classes]
    let classNames=''
    array.forEach(v=>{
        if(v){
            let item=v?.trim()
            let innerClasses=item.split(/\s/g)
            if(innerClasses.length > 0){
                innerClasses.forEach(innerClass=>{
                    let innerItem=innerClass?.trim()
                    if(from[innerItem]){
                        classNames+=`${from[innerItem]} `
                    }
                })
            }
            if(from[item]){
                classNames+=`${from[item]} `
            }
        }
    })
    return classNames
}

export default getClassNames
