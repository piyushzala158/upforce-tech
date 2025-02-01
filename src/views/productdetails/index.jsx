import Slider from "@/components/Swiper";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductDetails = ({ id, data }) => {
  if (!data) {
    return (
      <Typography variant="h6" align="center">
        Product not found
      </Typography>
    );
  }

  return (
    <>
      <Box padding={4}>
        <Link href="/">
          <ArrowLeft style={{ marginBottom: 10 }} />
        </Link>
        <Card>
          <Grid container spacing={3}>
            {/* Product Images */}
            <Grid item xs={12} md={6} height={"100%"}>
              <Slider slides={data.images} />
            </Grid>

            {/* Product Information */}
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {data.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  {data.description}
                </Typography>
                <Typography variant="h6" color="primary" mt={2}>
                  ${data.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Discount: {data.discountPercentage}%
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Category: {data.category}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Stock:{" "}
                  {data.stock > 0 ? `${data.stock} available` : "Out of stock"}
                </Typography>
                <Rating
                  value={data.rating}
                  readOnly
                  precision={0.1}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        {/* Additional Details */}
        <Box mt={4}>
          <Typography variant="h6">Product Details</Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem>
              <ListItemText primary="SKU" secondary={data.sku} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Weight" secondary={`${data.weight} kg`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dimensions"
                secondary={`${data.dimensions.width} x ${data.dimensions.height} x ${data.dimensions.depth} cm`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Warranty"
                secondary={data.warrantyInformation}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Shipping"
                secondary={data.shippingInformation}
              />
            </ListItem>
          </List>
        </Box>

        {/* Reviews */}
        <Box mt={4}>
          <Typography variant="h6">Customer Reviews</Typography>
          <Divider sx={{ my: 2 }} />
          {data.reviews.length > 0 ? (
            data.reviews.map((review, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body1" fontWeight="bold">
                  {review.reviewerName}
                </Typography>
                <Rating value={review.rating} readOnly precision={0.1} />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {review.comment}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No reviews available.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
