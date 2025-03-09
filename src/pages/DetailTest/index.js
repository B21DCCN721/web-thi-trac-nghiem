import { CardDetailTest } from "../../components/Card";
import DefaultLayout from "../../Layouts/DefaultLayout";

function DetailTest() {
    return ( 
        <DefaultLayout>
            <CardDetailTest info={{id:'1', time:'30/4', name:'Bài thi', author: 'B21DCCN721', quantity: '100', turn: '8'}}/>
        </DefaultLayout>
     );
}

export default DetailTest;