export default {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    },
    {
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'pincode', title: 'Pincode', type: 'string' },
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'book',
            title: 'Book',
            type: 'reference',
            to: [{ type: 'book' }],
          },
          {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: Rule => Rule.min(1),
          },
          {
            name: 'price',
            title: 'Price per Item',
            type: 'number',
          },
        ],
      }],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'orderStatus',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'processing',
    },
    {
      name: 'paymentId',
      title: 'Payment ID',
      type: 'string',
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
      media: 'paymentStatus',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'New Order',
        subtitle: `${subtitle} - ${media}`,
      };
    },
  },
};