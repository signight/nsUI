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
})
