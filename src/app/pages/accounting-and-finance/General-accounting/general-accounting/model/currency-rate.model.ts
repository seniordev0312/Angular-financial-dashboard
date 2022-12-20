export interface CurrencyRateModel {
    currencyRateId: number,
    currencyId: number,
    currencyName: string,
    currencySymbol: string,
    amount: number,
    baseCurrencyId: number,
    baseCurrencyName: string,
    changeDate: string,
    exchangeRate: number
}

