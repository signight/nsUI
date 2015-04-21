define(['jquery','mock'], function($, Mock) {
    Mock.mock(/tree.json/, 'get', {
        'list1|1-10': [{
            'name': function() {
                return Random.last();
            },
            'open|1': true,
            'children|1-3': [{
                'name': function() {
                    return Random.last();
                }
            }]
        }]
    });

    Mock.mock(/table1.json/,'get',{
        'list1|10':[{
            'id|+1':1,
            'desc': function() {
                return Random.title(2, 6)
            },
            'date':function () {
                return Random.date();
            },
            'amount|1-10000.2-3':1,
            'name':function () {
                return Random.last()
            }
        }],
        'list2|10':[{
            'id|+1':1,
            'desc': function() {
                return Random.title(2, 6)
            },
            'date':function () {
                return Random.date();
            },
            'amount|1-10000.2-3':1,
            'name':function () {
                return Random.last()
            }
        }]
    });

    Mock.mock(/table2.json/,'get',{
        'list|1-10':[{
            'name':function () {
                return Random.last()
            },
            'amount1|1-10000.2-3':1,
            'amount2|1-10000.2-3':1,
            'sum|1-10000.2-3':1,
            'date':function () {
                return Random.date();
            },
            'name2':function () {
                return Random.last()
            },
            'status|1':['已通过','未通过','待审批'],
            
        }]
    });
})
