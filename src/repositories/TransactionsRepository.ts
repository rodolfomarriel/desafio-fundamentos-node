import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // fazer income, outcome, total
  public getBalance(): Balance {
    const income = this.transactions
      .filter(transfer => transfer.type === 'income')
      .reduce((lastValue, currentValue) => {
        return lastValue + currentValue.value;
      }, 0);

    const outcome = this.transactions
      .filter(transfer => transfer.type === 'outcome')
      .reduce((lastValue, currentValue) => {
        return lastValue + currentValue.value;
      }, 0);

    const total = income - outcome;
    const listBalance = { income, outcome, total };

    return listBalance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
