<!--  -->

<template>
    <div>
        <table class="table" cellspacing="0" border="0">
            <thead>
                <tr>
                    <th>qwe</th>
                    <th>rwe</th>
                    <th>head1</th>
                    <th>fe2</th>
                    <th>head1</th>
                    <th>erw3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>111</td>
                    <td>111</td>
                    <td>111</td>
                    <td>111</td>
                    <td>111</td>
                    <td>111</td>
                </tr>
                <tr>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                </tr>
                <tr>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                </tr>
                <tr>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                </tr>
                <tr>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                    <td>222</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    name:'',
    data() {
        return {};
    },
}
</script>


<style lang='less' scoped>
/* TABLE */
@tableBgC:rgb(248, 248, 248);
@tablefontC:rgb(0, 0, 0);
@borderC:rgb(197, 197, 197);
.table {
    cursor: pointer;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    background-color: @tableBgC;
    >thead{
        text-align: center;
       >tr{
            border-radius: 10px;
            overflow: hidden;
           >th{
                width: auto;
                font-weight: normal;
                font-size: 18px;
                color: @tablefontC;
                height: 46px;
                &:not(:first-child){
                    border-left: 2px solid @borderC;
                }
           }
           
       } 
    }
    >tbody>tr:nth-child(2n) {
        background-color: rgb(240, 240, 240);
    }
    >tbody>tr {
        transition: 0.3s;
        text-align: center;
        border-radius: 10px;
        font-size: 16px;
        overflow: hidden;
        >td{
            border-top: 2px solid @borderC;
            width: auto;
            height: 36px;
            font-size: 16px;
            &:hover{
                color: rgb(0, 0, 0);
            }
        }
    }
}

</style>