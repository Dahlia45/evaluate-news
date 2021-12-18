import {checkURL} from '../client/js/URLChecker'

describe('Test URLChecker functionality', () => {
    test('Testing the URLChecker function defined or not', () => {
        expect(checkURL).toBeDefined();    })

    test('Testing the URLChecker function return false for invalid url', () => {
        expect(checkURL('mmm')).toBeFalsy();   
     })

    test('Testing the URLChecker function return true for valid url', () => {
        expect(checkURL('https://time.com/nextadvisor/credit-cards/reviews/delta-skymiles-reserve-amex-credit-card/')).toBeTruthy();   
     })
})
