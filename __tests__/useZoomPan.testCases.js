const panByTestCases = [
    {
        description: 'should pan to (x: 100, y: 100)',
        minScale: .1,
        maxScale: 20,
        events: [
            {
                movementX: 100,
                movementY: 100,
            }
        ],
        expected: 'matrix(1, 0, 0, 1, 100, 100)'
    },
    {
        description: 'should pan to (x: 50, y: 50)',
        minScale: .1,
        maxScale: 20,
        events: [
            {
                movementX: 100,
                movementY: 100,
            },
            {
                movementX: -50,
                movementY: -50,
            }
        ],
        expected: 'matrix(1, 0, 0, 1, 50, 50)'
    },
    {
        description: 'should pan to (x: -50, y: 50)',
        minScale: .1,
        maxScale: 20,
        events: [
            {
                movementX: -100,
                movementY: 100,
            },
            {
                movementX: 50,
                movementY: -50,
            }
        ],
        expected: 'matrix(1, 0, 0, 1, -50, 50)'
    }
]

const panToTestCases = [
    {
        description: 'should pan to (x: -50, y: -50) without changing scale',
        minScale: .1,
        maxScale: 20,
        destinations: [
            {
                x: -100,
                y: 100,
                scale: 1,
            },
            {
                x: -50,
                y: -50,
                scale: 1,
            }
        ],
        expected: 'matrix(1, 0, 0, 1, -50, -50)'
    },
    {
        description: 'should pan to (x: 50, y: 50) with scale 2.0',
        minScale: .1,
        maxScale: 20,
        destinations: [
            {
                x: 100,
                y: 100,
                scale: 2.0,
            },
            {
                x: 50,
                y: 50,
                scale: 2.0,
            }
        ],
        expected: 'matrix(2, 0, 0, 2, 50, 50)'
    },
    {
        description: 'should pan to (x: 750, y: 500) with sclae 2.5',
        minScale: .1,
        maxScale: 20,
        destinations: [
            {
                x: 100,
                y: 100,
                scale: 1.0,
            },
            {
                x: 750,
                y: 500,
                scale: 2.5,
            }
        ],
        expected: 'matrix(2.5, 0, 0, 2.5, 750, 500)'
    },
]

const zoomTestCases = [
    {
        description: 'should zoom to x: 150, y: 200 and scale: 1.02',
        minScale: .1,
        maxScale: 20,
        rect: {
            top: 100,
            left: 50,
        },
        events: [
            {
                pageX: 150,
                pageY: 200,
                deltaY: -1,
            }
        ],
        results: [
            'matrix(1.02, 0, 0, 1.02, 0, 0)',
            '150px 200px'
        ],
    },
    {
        description: 'should zoom to x: -245.09803921568627px, y: -98.0392156862745px and scale: 1.0404',
        minScale: .1,
        maxScale: 20,
        rect: {
            top: -50,
            left: 1000,
        },
        events: [
            {
                pageX: 750,
                pageY: 1200,
                deltaY: -0.5,
            },
            {
                pageX: -250,
                pageY: -100,
                deltaY: -0.5,
            },
        ],
        results: [
            'matrix(1.0404, 0, 0, 1.0404, -19.90196078431377, -25.960784313725544)',
            '-245.09803921568627px -98.0392156862745px'
        ],
    },
    {
        description: 'should zoom to x: 816.6531918890006px, y: 1327.061436819626px and scale: 0.96001584',
        minScale: .1,
        maxScale: 20,
        rect: {
            top: -500,
            left: 0,
        },
        events: [
            {
                pageX: 750,
                pageY: 1200,
                deltaY: 1,
            },
            {
                pageX: 750,
                pageY: 1200,
                deltaY: -1,
            },
            {
                pageX: 800,
                pageY: 1300,
                deltaY: 1,
            },
            {
                pageX: 800,
                pageY: 1300,
                deltaY: 1,
            },
        ],
        results: [
            'matrix(0.96001584, 0, 0, 0.96001584, -0.3470694400209118, -0.5716409012584744)',
            '816.6531918890006px 1327.061436819626px'
        ],
    },
]

module.exports = {
    panByTestCases,
    panToTestCases,
    zoomTestCases
};
