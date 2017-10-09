
//angular 4 
import { trigger,state, style, 
    transition, animate 
} from '@angular/animations';


/**
 * PAGE FADE IN 
 *
 */
export const pageFadeIn = trigger('pageFadeIn',[
    state('hidden',
        style({
            opacity:'0'
        })
    ),
    state('visible',
        style({
            opacity:'1'
        })
    ),
    transition('hidden => visible',[
        animate('150ms ease-in')
    ]) 
]);

/**
 * PAGE FADE OUT
 * 
 */
export const pageFadeOut = trigger('pageFadeOut',[
    state('hidden',
        style({
            opacity:'0'
        })
    ),
    state('visible',
        style({
            opacity:'1'
        })
    ),
    transition('visible => hidden',[
        animate('300ms ease-out')
    ]) 
]);

/**
 * GROW VERTICAL
 * 
 */
export const growVertical = trigger('growVertical',[
    state('hidden',
        style({
            transform:'scale(1,0)'
        })
    ),
    state('visible',
        style({
            transform:'scale(1,1)'
        })
    ),/*
    transition(':enter',[
        style({
            transform:'scale(1,1)'
        }),
        animate('1s 100ms ease-in')
    ]),*/
    transition('hidden => visible',[        
        animate('200ms 100ms ease-in')
    ]),
    transition('visible => hidden',[        
        animate('100ms ease-out')
    ]),/*
    transition(':leave',[
        style({
            transform:'scale(1,0)'
        }),
        animate('1s easy-out')
    ])*/                
]);

/**
 * GROW HORIZONTAL
 * 
 */
export const growHorizontal = trigger('growHorizontal',[
    state('hidden',
        style({
            opacity:'0'
        })
    ),
    state('visible',
        style({
            opacity:'1'
        })
    ),
    transition('hidden <=> visible',[
        animate('350ms ease-out')
    ])
]);

