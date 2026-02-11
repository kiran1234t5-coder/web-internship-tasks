import { EventEmitter } from "events";

export class Engine extends EventEmitter {
  constructor() {
    super();
    this.bids = []; // Buyers (Sorted High to Low)
    this.asks = []; // Sellers (Sorted Low to High)
    this.trades = [];
  }

  // Helper: Sort order book
  _sortBook(side) {
    if (side === "buy") {
      this.bids.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
    } else {
      this.asks.sort((a, b) => a.price - b.price || a.timestamp - b.timestamp);
    }
  }

  limit(order) {
    const newOrder = { 
      ...order, 
      id: order.id || crypto.randomUUID(), 
      timestamp: Date.now(),
      remainingQty: order.qty 
    };

    const book = newOrder.side === "buy" ? this.bids : this.asks;
    book.push(newOrder);
    this._sortBook(newOrder.side);
    
    this.match();
    this.emit("bookUpdate", { bids: this.bids, asks: this.asks });
  }

  market(order) {
    let remainingToFill = order.qty;
    const oppositeBook = order.side === "buy" ? this.asks : this.bids;
    const executionTrades = [];

    while (remainingToFill > 0 && oppositeBook.length > 0) {
      const bestOrder = oppositeBook[0];
      const matchQty = Math.min(remainingToFill, bestOrder.remainingQty || bestOrder.qty);

      const trade = {
        id: crypto.randomUUID(),
        price: bestOrder.price,
        qty: matchQty,
        side: order.side,
        timestamp: Date.now()
      };

      // Update state
      executionTrades.push(trade);
      this.trades.unshift(trade);
      
      if (bestOrder.remainingQty) bestOrder.remainingQty -= matchQty;
      else bestOrder.qty -= matchQty;
      
      remainingToFill -= matchQty;

      if ((bestOrder.remainingQty || bestOrder.qty) <= 0) {
        oppositeBook.shift();
      }

      this.emit("trade", trade);
    }

    this.emit("bookUpdate", { bids: this.bids, asks: this.asks });
    return executionTrades;
  }

  match() {
    // Pro logic: Match bids and asks recursively
    while (
      this.bids.length > 0 && 
      this.asks.length > 0 && 
      this.bids[0].price >= this.asks[0].price
    ) {
      const buy = this.bids[0];
      const sell = this.asks[0];
      const matchQty = Math.min(buy.remainingQty || buy.qty, sell.remainingQty || sell.qty);
      const matchPrice = sell.price; // Limit orders match at the maker's price

      const trade = {
        id: crypto.randomUUID(),
        price: matchPrice,
        qty: matchQty,
        side: "match",
        timestamp: Date.now()
      };

      this.trades.unshift(trade);
      this.emit("trade", trade);

      if (buy.remainingQty) buy.remainingQty -= matchQty; else buy.qty -= matchQty;
      if (sell.remainingQty) sell.remainingQty -= matchQty; else sell.qty -= matchQty;

      if ((buy.remainingQty || buy.qty) <= 0) this.bids.shift();
      if ((sell.remainingQty || sell.qty) <= 0) this.asks.shift();
    }
  }
}