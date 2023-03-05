import uuid from "react-uuid";
import dataTree from 'data-tree';



const usehanoi = () => {
    let leafs = [];
    let step = 0;

    const addLeafNode = ({
        id,
        node,
        tower,
        parent, }) => {
        if (parent === 0) {
            leafs = []
        }
        leafs.push({
            id,
            node,
            tower,
            parent,
            action: {
                step: -1,
                message: '',
            },
        });
    }
    const addLeafPrint = ({
        action,
        id,
    }) =>{
        console.log(action);
        step++;
        leafs =  leafs.map(leaf => {
            if(leaf.id === id){
                leaf.action.step = step;
                leaf.action.message = action;
            }
            return leaf;
        });

    }

    const hanoi = ({ n, source, destined, auxiliary, id, parent }) => {
        addLeafNode({
            id,
            node: n,
            tower: `${source},${destined},${auxiliary}`,
            parent,
        });
        const action = `Move disc ${n} from [${source} => ${destined}]`;
        if (n === 1) {
            
            addLeafPrint({
                id,
                action,
            });
        }
        else {
            hanoi({
                n: n - 1,
                source: source,
                destined: auxiliary,
                auxiliary: destined,
                id: uuid(),
                parent: id,
            });
            
            addLeafPrint({
                id,
                action,
            });
            hanoi({
                n: n - 1,
                source: auxiliary,
                destined: destined,
                auxiliary: source,
                id: uuid(),
                parent: id,
            });
        }
    }

    const getTree = ({n}) => {
        // console.log(leafs);
        let tree = dataTree.create();
        for(let i=n; i>=1; i--){
            const nodes = leafs.filter(leaf => leaf.node === i);
            // console.log(nodes);
            if(nodes){
                nodes.forEach(node => {
                    if(node.parent === 0){
                        tree.insert({
                            key: node.id,
                            values: {
                                hanoi: node.node,
                                tower: node.tower,
                                print: node.action.message,
                                printStep: node.action.step,
                            }
                        });
                    }else{
                        tree.insertTo((data) => data.key === node.parent,{
                            key: node.id,
                            values: {
                                hanoi: node.node,
                                tower: node.tower,
                                print: node.action.message,
                                printStep: node.action.step,
                            }
                        });
                    }
                });
            }
        }
        const exported = tree.export((data) => {
            return {
                name: `H(${data.values.hanoi})`,
                attributes:{
                    towers: data.values.tower,
                    print: `#${data.values.printStep} - ${data.values.print}`,
                },
            }
        });
        console.log(exported);
        return exported;
    }

    return {
        hanoi,
        getTree,
    }

}



export { usehanoi }