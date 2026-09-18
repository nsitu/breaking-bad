import React from 'react';
import styles from './Toaster.module.css';

const index = (props) => {
    let arr = []

    for(let i =0; i<=props.search.length; i++){
        for(let key in props.search[i]){
            let x = Object.keys(props.search[i]).find(a => props.search[i][a] === props.search[i][key]);
            let y = props.search[i][key]

            arr.push([x,y])
        }
    }

    console.log(arr.length !== 0 && arr)

    const map = arr.map((e,i) => {
        return <pre className={styles.content} key={i}>
        {
`${e[0]}: ${e[1]}
`
        }
        </pre>
    })
    return (
        <div className={styles.container}>
            {map}
        </div>
    );
};

export default index;

